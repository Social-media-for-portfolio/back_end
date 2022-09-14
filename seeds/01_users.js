/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const avatar = "https://www.w3schools.com/howto/img_avatar.png";
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      first_name: "Emir",
      last_name: "Akhmetov",
      password: "123",
      email: "emir@gmail.com",
      avatar_url: avatar,
    },
    {
      first_name: "Ray",
      last_name: "Lu",
      password: "123",
      email: "ray@gmail.com",
      avatar_url: avatar,
    },
    {
      first_name: "Matt",
      last_name: "Tan",
      password: "123",
      email: "matt@gmail.com",
      avatar_url: avatar,
    },
  ]);
};
