from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from database import SessionLocal

router = APIRouter()

# DEPENDENCY INJECTION
# Yields a temporary database connection for a single HTTP request, then safely closes it.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ROUTE HANDLER
# db: Session = Depends(get_db) forces FastAPI to run get_db() and pass the connection here.
@router.get("/menu", response_model=List[schemas.MenuItem])
def get_menu(db: Session = Depends(get_db)):
    # Executes the equivalent of "SELECT * FROM menu_items;"
    return db.query(models.DBMenuItem).all()
