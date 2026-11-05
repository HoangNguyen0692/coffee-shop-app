from sqlalchemy import Column, Integer, String, Float, Boolean
from database import Base

# This class dictates the exact column types and constraints inside the SQLite file
class DBMenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    available = Column(Boolean, default=True)

