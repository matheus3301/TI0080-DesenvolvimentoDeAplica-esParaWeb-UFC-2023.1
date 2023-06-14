const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await createTeachers();
  await createStudents();
}

async function createStudents() {
  await prisma.student.deleteMany({});
  await prisma.student.create({
    data: {
      name: 'Matheus Rocha Monteiro',
      profilePictureUrl:
        'https://memetemplatehouse.com/wp-content/uploads/2020/05/sad-cat-meme-template-1.jpg',
      credentials: {
        create: {
          email: 'matheus@gmail.com',
          password: '123123',
          type: 'STUDENT',
        },
      },
    },
    include: {
      credentials: true,
      enrollments: true,
    },
  });

  await prisma.student.create({
    data: {
      name: 'Vitor Rosa Evangelista',
      profilePictureUrl:
        'https://media.tenor.com/fYCeLcil6BkAAAAd/dog-doggo.gif',
      credentials: {
        create: {
          email: 'vitor@gmail.com',
          password: '123123',
          type: 'STUDENT',
        },
      },
    },
    include: {
      credentials: true,
      enrollments: true,
    },
  });
}

async function createTeachers() {
  await prisma.teacher.deleteMany({});
  await prisma.teacher.create({
    data: {
      cpf: '123.123.123-12',
      name: 'José Marques Soares',
      profilePictureUrl:
        'https://si3.ufc.br/sigaa/verFoto?idFoto=1016111&key=f84558656b1d5538942c28245457f47c',
      credentials: {
        create: {
          email: 'marques@gmail.com',
          password: '123123',
          type: 'TEACHER',
        },
      },
    },
    include: {
      credentials: true,
      classes: true,
    },
  });

  await prisma.teacher.create({
    data: {
      cpf: '123.123.123-23',
      name: 'Atslands Rego da Rocha',
      profilePictureUrl:
        'https://si3.ufc.br/sigaa/verFoto?idFoto=296136&key=5f9c21d84b33a193b6af2fb58a85dbbf',
      credentials: {
        create: {
          email: 'atslands@gmail.com',
          password: '123123',
          type: 'TEACHER',
        },
      },
    },
    include: {
      credentials: true,
      classes: true,
    },
  });

  await prisma.teacher.create({
    data: {
      cpf: '123.123.123-13',
      name: 'Guilherme de Alencar Barreto',
      profilePictureUrl:
        'https://si3.ufc.br/sigaa/verFoto?idFoto=170356&key=6e6b12c200c63a423a185a6e17aeee7c',
      credentials: {
        create: {
          email: 'guilherme@gmail.com',
          password: '123123',
          type: 'TEACHER',
        },
      },
    },
    include: {
      credentials: true,
      classes: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
