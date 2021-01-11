import dotenv from 'dotenv'
import Discord, {VoiceChannel, VoiceConnection} from 'discord.js'

const client: Discord.Client = new Discord.Client()

dotenv.config()

client.on('ready', () => {
  console.log("Worawan is ready")
})

client.on("message", async (mess) => {
  const command: string = mess.content.toLowerCase()
  const voiceChannel: VoiceChannel | null | undefined = mess.member?.voice.channel
  switch (command) {
    case "meow":
      const voiceRoom: VoiceConnection | undefined = await voiceChannel?.join()
      const player = voiceRoom?.play('./assets/sounds/Meow-cat-sound-effect.mp3')
      player?.on('finish', () => {
        voiceChannel?.leave()
      })
  }
})

client.login(process.env.DISCORD_TOKEN)