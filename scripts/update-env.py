import urllib.parse

pw = "KK8#m9k2bAzV4M"
encoded = urllib.parse.quote(pw)
# Simpler URL without pgbouncer param for db push
url = f"postgresql://postgres.cjjcdayhrfsyxugzitiu:{encoded}@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres"

with open(".env", "w") as f:
    f.write(f"DATABASE_URL={url}\n")

print("✅ .env updated (simplified URL)")
print("URL starts with:", url[:50])
