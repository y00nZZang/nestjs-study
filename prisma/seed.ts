import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 학교 데이터 생성
  const schools = await prisma.school.createMany({
    data: [
      { name: "서울대학교", address: "서울특별시 관악구" },
      { name: "연세대학교", address: "서울특별시 서대문구" },
      { name: "고려대학교", address: "서울특별시 성북구" },
    ],
    skipDuplicates: true,
  });

  console.log(`${schools.count}개의 학교가 생성되었습니다.`);

  // 생성된 학교 조회
  const createdSchools = await prisma.school.findMany();

  // 사용자 데이터 생성
  const users = await prisma.user.createMany({
    data: [
      {
        name: "홍길동",
        email: "hong@example.com",
        schoolId: createdSchools[0].id,
      },
      {
        name: "김철수",
        email: "kim@example.com",
        schoolId: createdSchools[1].id,
      },
      {
        name: "이영희",
        email: "lee@example.com",
        schoolId: createdSchools[2].id,
      },
      { name: "박지성", email: "park@example.com" },
    ],
    skipDuplicates: true,
  });

  console.log(`${users.count}명의 사용자가 생성되었습니다.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
