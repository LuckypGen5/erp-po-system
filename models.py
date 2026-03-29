from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base

class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"

    id = Column(Integer, primary_key=True, index=True)
    vendor_name = Column(String)
    total_amount = Column(Float)


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    quantity = Column(Integer)
    price = Column(Float)
    po_id = Column(Integer, ForeignKey("purchase_orders.id"))