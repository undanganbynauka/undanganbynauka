import urllib.parse

pw = "KK8#m9k2bAzV4M"
encoded = urllib.parse.quote(pw)

# Transaction pooler (IPv4) — for app runtime
DATABASE_URL = f"postgresql://postgres.cjjcdayhrfsyxugzitiu:{encoded}@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Session pooler (IPv4) — for migrations / db push
DIRECT_URL = f"postgresql://postgres.cjjcdayhrfsyxugzitiu:{encoded}@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres"

with open(".env", "w") as f:
    f.write(f"DATABASE_URL={DATABASE_URL}\n")
    f.write(f"DIRECT_URL={DIRECT_URL}\n")

print("=== .env (masked) ===")
print(f"DATABASE_URL={DATABASE_URL.split(':')[0]}://postgres.cjjcdayhrfsyxugzitiu:***@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1")
print(f"DIRECT_URL={DIRECT_URL.split(':')[0]}://postgres.cjjcdayhrfsyxugzitiu:***@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres")
