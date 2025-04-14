export default defineEventHandler(async () => {
  return Response.json({ success: true, data: 'Dziękuję!' }, { status: 200 })
})
