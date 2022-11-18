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
      bio: "Programming, hiking, astrophysics",
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
      bio: "Handball, programming and Jiu-jitsu",
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
        "https://ca.slack-edge.com/TKZN62HDF-U02B4FV26G1-2c571b30bd3f-512",
    },
    {
      first_name: "GP",
      last_name: "J",
      password: "123",
      bio: "Software Engineer",
      location: "Brooklyn, NY",
      birthday: "03/21/1998",
      email: "gp@gmail.com",
      avatar_url:
        "https://ca.slack-edge.com/TKZN62HDF-U02AS3JAANP-5604ab4b86b7-512",
    },
    {
      first_name: "Zohaib",
      last_name: "Manzoor",
      password: "123",
      bio: "Software engineering, boxing",
      location: "Brooklyn, NY",
      birthday: "01/11/1999",
      email: "zo@gmail.com",
      avatar_url:
        "https://ca.slack-edge.com/TKZN62HDF-U02ANS9SECD-046536947bb1-512",
    },
    {
      first_name: "Mark",
      last_name: "R",
      password: "123",
      bio: "Software engineering, gaming",
      location: "New Jersey",
      birthday: "04/15/2000",
      email: "mark@gmail.com",
      avatar_url:
        "https://ca.slack-edge.com/TKZN62HDF-U02CE4N9F4Y-a469b5f3c335-512",
    },
  ]);
};
