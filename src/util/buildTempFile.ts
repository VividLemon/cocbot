import { randomUUID } from 'crypto'
import { writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'

export default async (content: string) => {
  const path = join(tmpdir(), `${randomUUID()}.json`)
  await writeFile(path, content)
  return path
}
