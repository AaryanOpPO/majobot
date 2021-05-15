const Discord = require("discord.js");

module.exports = {
 name: "id",
 aliases: ["get-id"],
 description: "Display a mentioned user ID (Yes, you can copy this directly from Discord too)",
 category: "Moderation",
 usage: "id <mention>",
 run: async (client, message, args) => {
  try {
   const mention = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.member;
   if(!mention) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You must mention a user"
    }})
   }
   const userid = new Discord.MessageEmbed()
    .setThumbnail(mention.user.avatarURL())
    .setColor("RANDOM")
    .setDescription('Here is ' + `${mention.user.username} ID` + mention.id)
   message.channel.send(userid)  
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
 