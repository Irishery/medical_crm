"""Add patient.id to schedule

Revision ID: a0943fe0d1cc
Revises: f5e2f65f6c00
Create Date: 2024-11-20 00:47:04.962965

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a0943fe0d1cc'
down_revision: Union[str, None] = 'f5e2f65f6c00'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('schedules', sa.Column('patient_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'schedules', 'patients', ['patient_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'schedules', type_='foreignkey')
    op.drop_column('schedules', 'patient_id')
    # ### end Alembic commands ###