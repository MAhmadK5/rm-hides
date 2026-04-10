// prisma.config.ts
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // PASTE YOUR DIRECT_URL STRING MANUALLY HERE FOR ONE TEST
    url: 'postgresql://postgres.rxegwwkvhezvqgkxwznl:[RMHIDES69123]@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"',
  },
});