/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("friend_requests").del();
  await knex("friend_requests").insert([
    { sender_id: "3", receiver_id: "1", is_accepted: true },
    { sender_id: "3", receiver_id: "2", is_accepted: true },
    { sender_id: "1", receiver_id: "2", is_accepted: true },
    { sender_id: "1", receiver_id: "4", is_accepted: true },
    { sender_id: "1", receiver_id: "5", is_accepted: true },
    { sender_id: "5", receiver_id: "4", is_accepted: true },
    { sender_id: "6", receiver_id: "1", is_accepted: true },
    { sender_id: "6", receiver_id: "3", is_accepted: true },
  ]);
};
