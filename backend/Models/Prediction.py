from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Column, Integer, String, Text, DateTime
from DataBase.db import Base
from datetime import datetime

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_text = Column(Text, nullable=False)
    result = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # ForeignKey: user.id
    user_id = Column(Integer, ForeignKey("users.id"))

    # Relation
    owner = relationship("User", back_populates="predictions")

    

