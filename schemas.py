from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    name: str
    quantity: int
    price: float

class PurchaseOrderCreate(BaseModel):
    vendor_name: str
    products: List[Product]