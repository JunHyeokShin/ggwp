'use server'

import { revalidatePath } from 'next/cache'
import {
  updatePlayerInfoDatabase,
  updatePlayerLeagueDatabase,
  updatePlayerMatchesDatabase,
} from './database'

export async function updatePlayer(puuid, gameName, tagLine) {
  await updatePlayerInfoDatabase(puuid, gameName, tagLine)
  await updatePlayerLeagueDatabase(puuid)
  await updatePlayerMatchesDatabase(puuid, 10)
  revalidatePath('/player/[gameNameAndTagLine]', 'page')
}
