import dotenv from 'dotenv'
import Discord, {MessageEmbed, VoiceChannel, VoiceConnection} from 'discord.js'
import fs from "fs"

const client: Discord.Client = new Discord.Client()
let sounds: Array<string> = []
const posiblity: Array<number> = [5,250,150,95]
const soundList: Array<string> = []

fs.readdir("./assets/sounds", (err,files) => {
  for (let i = 0;i < files.length;i++) {
    for (let times = 0; times < posiblity[i];times++) {
      sounds.push(`./assets/sounds/${files[i]}`)
    }
    soundList.push(files[i])
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
    case "-rate":
      let content: string = ""
      let total = posiblity.reduce((a, b) => a + b, 0)
      for (let i = 0;i < soundList.length;i++) {
        content += `${soundList[i]} --> **${Math.round((posiblity[i]/total)*100)}%** \n`
      }
      const embed = new MessageEmbed().setTitle("Drop rates").setDescription(content)
      await mess.channel.send(embed)

  }
})

client.login(process.env.DISCORD_TOKEN)