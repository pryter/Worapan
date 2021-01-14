import dotenv from 'dotenv'
import Discord, {VoiceChannel, VoiceConnection} from 'discord.js'
import fs from "fs"

const client: Discord.Client = new Discord.Client()
let sounds: Array<string> = []
const posiblity: Array<number> = [45,45,10]

fs.readdir("./assets/sounds", (err,files) => {
  for (let i = 0;i < files.length;i++) {
    for (let times = 0; times < posiblity[i];times++) {
      sounds.push(files[i])
    }
  }
})

dotenv.config()

client.on('ready', () => {
  console.log("Worawan is ready")
})


client.on("message", async (mess) => {
  const command: string = mess.content
  const voiceChannel: VoiceChannel | null | undefined = mess.member?.voice.channel
  switch (command) {
    case "meow":
      const voiceRoom: VoiceConnection | undefined = await voiceChannel?.join()
      voiceRoom?.play(sounds[Math.floor(Math.random() * (sounds.length))])
      await mess.delete()
      break
    case "Meow":
      await voiceChannel?.join()
      await mess.delete()
      break
  }
})

client.login(process.env.DISCORD_TOKEN)