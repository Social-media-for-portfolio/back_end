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
      avatar_url:
      "https://i.imgur.com/mnsUB79.jpeg"
    },
    {
      first_name: "Ray",
      last_name: "Lu",
      password: "123",
      email: "ray@gmail.com",
      avatar_url:
        "https://media-exp1.licdn.com/dms/image/C4E03AQEcFcYPvmJKWw/profile-displayphoto-shrink_800_800/0/1637020996535?e=1672272000&v=beta&t=_ZvCb9-bPANycgGwjbYKjCL7X0xmQVLbeDRf-_kSO0w",
    },
    {
      first_name: "Matt",
      last_name: "Tan",
      password: "123",
      email: "matt@gmail.com",
      avatar_url:
        "https://media-exp1.licdn.com/dms/image/D4D35AQHAPv3WKZj42w/profile-framedphoto-shrink_800_800/0/1637701691681?e=1667358000&v=beta&t=1EEapWnsmXQ7JoYgcpmy4sqlip8CDDvGBRL3NSDXULs",
    },
  ]);
};
