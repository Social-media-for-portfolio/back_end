/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("posts").del();
  await knex("posts").insert([
    {
      user_id: 1,
      content: "Hey, my name is Emir! Who wants to go skateboarding?",
      likes: 25,
      replies: 10,
    },
    {
      user_id: 2,
      content: "Hey, my name is Ray! Who wants to play handball?",
      likes: 23,
      replies: 12,
    },
    {
      user_id: 3,
      content: "Hey, my name is Matt! Who wants to play Apex?",
      likes: 25,
      replies: 13,
    },
  ]);
};
