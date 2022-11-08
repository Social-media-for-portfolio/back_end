/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const avatar = "https://www.w3schools.com/howto/img_avatar.png";
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("users").del();
  await knex("users").insert([
    {
      first_name: "Emir",
      last_name: "Akhmetov",
      bio: "Programmer and hiker",
      location: "Brooklyn, NY",
      birthday: "02/10/1997",
      password: "123",
      email: "emir@gmail.com",
      avatar_url:
        "https://media-exp1.licdn.com/dms/image/C4E03AQHIA_qWXmpKaQ/profile-displayphoto-shrink_800_800/0/1661269119965?e=2147483647&v=beta&t=3NQ9GC3bo5EPOUb-OpytSndMu0I6-7b-7uAJ050F6oc",
    },
    {
      first_name: "Ray",
      last_name: "Lu",
      password: "123",
      bio: "Handball and Jiu-jitsu",
      location: "Brooklyn, NY",
      birthday: "03/11/1999",
      email: "ray@gmail.com",
      avatar_url:
        "https://media-exp1.licdn.com/dms/image/C4E03AQEcFcYPvmJKWw/profile-displayphoto-shrink_800_800/0/1637020996535?e=1672272000&v=beta&t=_ZvCb9-bPANycgGwjbYKjCL7X0xmQVLbeDRf-_kSO0w",
    },
    {
      first_name: "Matt",
      last_name: "Tan",
      password: "123",
      bio: "Programmer and gamer",
      location: "Brooklyn, NY",
      birthday: "05/22/1998",
      email: "matt@gmail.com",
      avatar_url:
        "https://media-exp1.licdn.com/dms/image/D4D35AQHAPv3WKZj42w/profile-framedphoto-shrink_800_800/0/1637701691681?e=1668492000&v=beta&t=AGYr0Ax5D8O1SeNRKlQMbCNT9OXwLrKdhndIAAciHnY",
    },
  ]);
};
