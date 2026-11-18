from database import SessionLocal
from models import DBMenuItem

# ==========================================
# DATABASE CONNECTION BLOC
# ==========================================
# Opens a temporary, isolated pipeline to your SQLite file.
db = SessionLocal()

try:
    # ==========================================
    # VALIDATION BLOC
    # ==========================================
    # Checks if the table already has data to prevent accidental duplicates if you run this twice.
    existing_items = db.query(DBMenuItem).first()
    
    if not existing_items:
        # ==========================================
        # DATA CREATION BLOC
        # ==========================================
        # Creates Python objects representing exact rows in your database table.
        item1 = DBMenuItem(
            name="Cà phê Sữa Đá",
            description="Traditional Vietnamese iced coffee with condensed milk.",
            price=4.50,
            available=True,
            image_url="https://placehold.co/600x400/27272a/ffffff?text=Ca+Phe+Sua+Da"
        )
        
        item2 = DBMenuItem(
            name="Café Crème",
            description="Classic Parisian espresso with hot steamed milk.",
            price=3.50,
            available=True,
            image_url="https://placehold.co/600x400/27272a/ffffff?text=Cafe+Creme"
        )
        
        # ==========================================
        # COMMIT BLOC
        # ==========================================
        # Stages the objects and permanently writes them to the coffee_shop.db file.
        db.add_all([item1, item2])
        db.commit()
        print("Successfully seeded the database!")
    else:
        print("Database already contains data. Skipping seed.")

finally:
    # ==========================================
    # CLEANUP BLOC
    # ==========================================
    # Safely closes the connection to free up system memory.
    db.close()
