const Discord = require('discord.js')
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "sepia",
 aliases: [],
 description: "Add sepia effect to user avatar",
 category: "Image",
 usage: "sepia [user mention, user id, user name]",
 run: async (client, message, args) => {
  try {
    const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.member;
   const wait = await message.channel.send({embed: {
     color: 4779354,
     description: "✨ | Please wait... I'm generating your image",
    }})
   const buffer = await AmeAPI.generate("sepia", {
    url: User.user.displayAvatarURL({
     format: "png",
     size: 2048
    })
   });
   const attachment = new Discord.MessageAttachment(buffer, "sepia.png");
   message.channel.send(attachment);
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
