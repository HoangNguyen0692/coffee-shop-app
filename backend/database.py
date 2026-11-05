from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite stores the database in a local file named coffee_shop.db in the backend folder
SQLALCHEMY_DATABASE_URL = "sqlite:///./coffee_shop.db"

# connect_args parameter is strictly required for SQLite in FastAPI
# to prevent accidental thread-sharing blocks during concurrent requests
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# SessionLocal will be injected into our FastAPI routes to handle database queries
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# All database models will inherit from this Base class
Base = declarative_base()

