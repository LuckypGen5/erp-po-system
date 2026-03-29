from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from database import engine, SessionLocal
import models
import schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
def home():
    return FileResponse("static/index.html")


@app.post("/create-po")
def create_po(po: schemas.PurchaseOrderCreate):
    db = SessionLocal()

    total = 0
    for p in po.products:
        total += p.quantity * p.price

    tax = total * 0.05
    final_total = total + tax

    new_po = models.PurchaseOrder(
        vendor_name=po.vendor_name,
        total_amount=final_total
    )

    db.add(new_po)
    db.commit()
    db.refresh(new_po)

    for p in po.products:
        product = models.Product(
            name=p.name,
            quantity=p.quantity,
            price=p.price,
            po_id=new_po.id
        )
        db.add(product)

    db.commit()
    db.close()

    return {
        "message": "PO Created",
        "total": final_total
    }


@app.get("/purchase-orders")
def get_purchase_orders():
    db = SessionLocal()
    orders = db.query(models.PurchaseOrder).all()

    result = []
    for order in orders:
        result.append({
            "id": order.id,
            "vendor_name": order.vendor_name,
            "total_amount": order.total_amount
        })

    db.close()
    return result

@app.delete("/purchase-orders/{po_id}")
def delete_po(po_id: int):
    db = SessionLocal()

    # delete products first
    db.query(models.Product).filter(models.Product.po_id == po_id).delete()

    # delete purchase order
    db.query(models.PurchaseOrder).filter(models.PurchaseOrder.id == po_id).delete()

    db.commit()
    db.close()

    return {"message": "Deleted successfully"}