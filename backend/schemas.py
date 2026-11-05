from pydantic import BaseModel

# This Pydantic schema validates incoming HTTP data and formats the outgoing JSON
class MenuItem(BaseModel):
    id: int
    name: str
    description: str
    price: float
    available: bool = True

    # Instructs Pydantic to seamlessly translate raw SQLAlchemy ORM objects into dictionaries
    class Config:
        from_attributes = True

