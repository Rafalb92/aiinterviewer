import { randomUUID } from 'node:crypto'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import { interview } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const { type, role, level, techstack, amount, userId } = await readBody(event)
  const db = useDrizzle()

  try {
    const { text: questions } = await generateText({
      model: google('gemini-2.0-flash-001'),
      prompt: `Przygotuj pytania na rozmowę kwalifikacyjną.
    Stanowisko pracy: ${role}.
    Poziom doświadczenia: ${level}.
    Stos technologiczny używany w pracy: ${techstack}.
    Nacisk między pytaniami behawioralnymi a technicznymi powinien być skierowany w stronę: ${type}.
    Liczba wymaganych pytań: ${amount}.
    
    Proszę zwrócić tylko pytania, bez dodatkowego tekstu.
    Pytania będą odczytywane przez asystenta głosowego, więc nie używaj znaków takich jak "/" czy "*", ani żadnych innych znaków specjalnych, które mogłyby zakłócić działanie asystenta głosowego.
    
    Zwróć pytania w następującym formacie:
    ["Pytanie 1", "Pytanie 2", "Pytanie 3"]
    
    Dziękuję! <3
  `
    })
    const interviewData: Interview = {
      id: randomUUID(),
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(','),
      questions: JSON.parse(questions),
      userId: userId,
      finalized: true,
      createdAt: new Date()
    }

    // await fbDatabase.collection('interviews').add(interview)

    await db
      .insert(interview)
      .values({
        ...interviewData,
        questions: JSON.stringify(interviewData.questions),
        techstack: JSON.stringify(interviewData.techstack)
      })

    return { success: true, status: 201 }
  } catch (error) {
    console.error('Error:', error)
    return { success: false, error: error, status: 500 }
  }
})
