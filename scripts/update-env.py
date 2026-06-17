import urllib.parse

pw = "naukaproject2026"
encoded = urllib.parse.quote(pw)

DATABASE_URL = f"postgresql://postgres.cjjcdayhrfsyxugzitiu:{encoded}@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL = f"postgresql://postgres.cjjcdayhrfsyxugzitiu:{encoded}@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres"

with open(".env", "w") as f:
    f.write(f"DATABASE_URL={DATABASE_URL}\n")
    f.write(f"DIRECT_URL={DIRECT_URL}\n")

print("=== .env updated (masked) ===")
print(f"DATABASE_URL=postgresql://postgres.cjjcdayhrfsyxugzitiu:***@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1")
print(f"DIRECT_URL=postgresql://postgres.cjjcdayhrfsyxugzitiu:***@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres")
