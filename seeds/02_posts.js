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
      content: "Who wants to go skateboarding at LES today?",
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
      content: "Looking for people to play Apex with me tonight.",
      likes: 25,
      replies: 13,
    },
  ]);
};
