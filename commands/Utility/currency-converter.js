const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const currency = require("currency-converter-lt");
const currency_converter = new currency();
const currencies_list = require("../../utilities/currencies");

module.exports = {
 name: "currency-converter",
 aliases: ["currency"],
 description: "Convert currencies like USD, EURO, Bitcoin etc.",
 category: "Utility",
 usage: "currency-converter <number> <from> <to>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter amout of money to convert!\n\n**Usage:** \`${client.prefix} currency-converter <number> <from> <to>\`\n**Example:** \`${client.prefix} currency-converter 100 PLN USD\``);
   }
   if (args[0].toLowerCase() == "list") {
    let embed = new MessageEmbed()
     .setDescription(`\`${currencies_list.join("`, `")}\``)
     .setColor("GREEN")
     .setTitle(`${client.bot_emojis.success} All supported currencies`)
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    return message.reply({ embeds: [embed] });
   }
   if (isNaN(args[0])) {
    return client.createError(message, `${client.bot_emojis.error} | Amout of money must be number!\n\n**Usage:** \`${client.prefix} currency-converter <number> <from> <to>\`\n**Example:** \`${client.prefix} currency-converter 100 PLN USD\``);
   }
   if (!args[1]) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter base currency (from which currency it is)\n\n**Usage:** \`${client.prefix} currency-converter <number> <from> <to>\`\n**Example:** \`${client.prefix} currency-converter 100 PLN USD\``);
   }
   if (args[1].toString().length > 3) {
    return client.createError(message, `${client.bot_emojis.error} | Currency code can't be longer than \`3\` characters!\n\n**Usage:** \`${client.prefix} currency-converter <number> <from> <to>\`\n**Example:** \`${client.prefix} currency-converter 100 PLN USD\``);
   }
   if (!currencies_list.includes(args[1].toUpperCase())) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter vaild first currency code!\n**Tip:** To display all currencies codes please use \`${client.prefix} currency-converter list\`!\n\n**Usage:** \`${client.prefix} currency-converter <number> <from> <to>\`\n**Example:** \`${client.prefix} currency-converter 100 PLN USD\``);
   }
   if (!args[2]) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter second currency (to which currency it is converted)\n\n**Usage:** \`${client.prefix} currency-converter <number> <from> <to>\`\n**Example:** \`${client.prefix} currency-converter 100 PLN USD\``);
   }
   if (args[2].toString().length > 3) {
    return client.createError(message, `${client.bot_emojis.error} | Second currency code can't be longer than \`3\` characters!\n\n**Usage:** \`${client.prefix} currency-converter <number> <from> <to>\`\n**Example:** \`${client.prefix} currency-converter 100 PLN USD\``);
   }
   if (!currencies_list.includes(args[2].toUpperCase())) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter vaild second currency code!\n**Tip:** To display all currencies codes please use \`${client.prefix} currency-converter list\`!\n\n**Usage:** \`${client.prefix} currency-converter <number> <from> <to>\`\n**Example:** \`${client.prefix} currency-converter 100 PLN USD\``);
   }
   const wait = new MessageEmbed() // Prettier
    .setColor("#5865f2")
    .setDescription(`${client.bot_emojis.loading} | Please wait... I'm converting \`${args[0]} ${args[1].toUpperCase()}\` to \`${args[2].toUpperCase()}\``);
   message.reply({ embeds: [wait] }).then((msg) => {
    (async () => {
     await currency_converter
      .from(args[1].toUpperCase())
      .to(args[2].toUpperCase())
      .amount(parseInt(args[0]))
      .convert()
      .then((response) => {
       const row = new MessageActionRow() // Prettier
        .addComponents(
         // Prettier
         new MessageButton() // Prettier
          .setLabel("Show more")
          .setStyle("LINK")
          .setURL(`https://www.google.com/search?q=${args[0]}+${args[1].toUpperCase()}+to+${args[2].toUpperCase()}`)
        );
       const embed = new MessageEmbed() // Prettier
        .setColor("GREEN")
        .setTitle(`${client.bot_emojis.success} Success!`)
        .setDescription(`\`${args[0]} ${args[1].toUpperCase()}\` ➡️ \`${response.toString()} ${args[2].toUpperCase()}\`\n\n||Data provided by Google||`)
        .setFooter(
         `Requested by ${message.author.username}`,
         message.author.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 2048,
         })
        );
       msg.edit({ embeds: [embed], components: [row] });
      });
    })();
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
