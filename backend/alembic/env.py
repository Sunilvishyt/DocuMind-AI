import asyncio
import os
from logging.config import fileConfig

from alembic import context
from app.constants import normalize_async_database_url
from app.database import Base
from dotenv import load_dotenv
from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config

load_dotenv()

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# 1. Fallback across all possible sources (POSTGRES_URL, DATABASE_URL, or alembic.ini)
raw_url = (
    os.getenv("POSTGRES_URL")
    or os.getenv("DATABASE_URL")
    or config.get_main_option("sqlalchemy.url")
)

# # Make sure this string matches the exact key inside your .env file!
# database_url = os.getenv("POSTGRES_URL")


database_url = normalize_async_database_url(raw_url)

if database_url:
    config.set_main_option("sqlalchemy.url", database_url)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# if database_url:
#     # Convert postgres:// or postgresql:// to postgresql+asyncpg://
#     if database_url.startswith("postgres://"):
#         database_url = database_url.replace("postgres://", "postgresql+asyncpg://", 1)
#     elif database_url.startswith("postgresql://"):
#         database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)

#     # When deployed on Render or Neon, the database connection string often includes query parameters like ?sslmode=require. Synchronous drivers (like psycopg2) accept sslmode, but asyncpg strictly requires ssl instead
#     # 2. Parse URL and strip unsupported query parameters for asyncpg
#     parsed = urlparse(database_url)
#     query_params = parse_qs(parsed.query)

#     # asyncpg does not accept channel_binding or sslmode
#     query_params.pop("channel_binding", None)

#     if "sslmode" in query_params:
#         # Convert sslmode=require to ssl=require or ssl=true for asyncpg
#         ssl_val = query_params.pop("sslmode")[0]
#         if ssl_val in ("require", "verify-ca", "verify-full"):
#             query_params["ssl"] = ["require"]

#     # Reconstruct sanitized URL
#     new_query = urlencode(query_params, doseq=True)
#     database_url = urlunparse(parsed._replace(query=new_query))

#     config.set_main_option("sqlalchemy.url", database_url)

# # Interpret the config file for Python logging.
# # This line sets up loggers basically.
# if config.config_file_name is not None:
#     fileConfig(config.config_file_name)

# # add your model's MetaData object here
# # for 'autogenerate' support
# # from myapp import mymodel
# # target_metadata = mymodel.Base.metadata
target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    """Synchronous callback executed inside the async connection context."""
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """Creates an AsyncEngine and executes migrations on an event loop."""
    # 1. Grab the sanitized URL that we modified above
    # Get raw section dict and explicitly override 'sqlalchemy.url' with the sanitized string
    section = config.get_section(config.config_ini_section, {})
    section["sqlalchemy.url"] = config.get_main_option("sqlalchemy.url")

    connectable = async_engine_from_config(
        section,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode using asyncio."""
    asyncio.run(run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
