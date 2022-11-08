/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("friend_requests").del();
  await knex("friend_requests").insert([
    { sender_id: "4", receiver_id: "1", is_accepted: true },
    { sender_id: "4", receiver_id: "2", is_accepted: true },
    { sender_id: "4", receiver_id: "3", is_accepted: true },
  ]);
};
