const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await createTeachers();
  await createStudents();
  await createQuestions();
}

async function createQuestions() {
  await prisma.question.deleteMany({});
  await prisma.question.create({
    data: {
      statement:
        'Tendo-se 5 objetos diferentes e 7 caixas numeradas de 1 a 7, o número de formas distintas de se guardar um objeto em cada caixa é',
      title: 'Matemática - Combinatória',
      teacherId: (await prisma.teacher.findFirst({})).id,
      choices: {
        create: [
          {
            value: '2520',
            isCorrect: true,
          },
          {
            value: '1260',
            isCorrect: false,
          },
        ],
      },
    },
    include: {
      choices: true,
    },
  });

  await prisma.question.create({
    data: {
      statement:
        'Vacúolos são estruturas existentes em diferentes tipos celulares, entretanto, o vacúolo de suco celular é uma estrutura típica da célula vegetal. Observe as funções abaixo e marque aquela que não pode ser atribuída ao vacúolo.',
      title: 'Biologia - Biologia Celular',
      teacherId: (await prisma.teacher.findFirst({})).id,
      choices: {
        create: [
          {
            value: 'Participa do processo de respiração celular.',
            isCorrect: true,
          },
          {
            value: 'Realiza a digestão de componentes celulares.',
            isCorrect: false,
          },
        ],
      },
    },
    include: {
      choices: true,
    },
  });

  await prisma.question.create({
    data: {
      statement:
        'Estrutura geológica é a classificação da litosfera terrestre conforme as suas diferentes origens e as composições de suas rochas. Por seus processos formativos, as estruturas geológicas com condições mais favoráveis à formação de combustíveis fósseis são:',
      title: 'Geografia - Geografia Física',
      teacherId: (await prisma.teacher.findFirst({})).id,
      choices: {
        create: [
          {
            value: 'As bacias sedimentares',
            isCorrect: true,
          },
          {
            value: 'As plataformas cristalinas',
            isCorrect: false,
          },
        ],
      },
    },
    include: {
      choices: true,
    },
  });

  await prisma.question.create({
    data: {
      statement:
        'Dentro de um elevador, um objeto de peso 100 N está apoiado sobre uma superfície. O elevador está descendo e freando com aceleração vertical e para cima de 0,1 m/s2. Considere a aceleração da gravidade como 10 m/s2. Durante o tempo de frenagem, a força que sustenta o objeto vale, em newtons:',
      title: 'Física - Dinâmica',
      teacherId: (await prisma.teacher.findFirst({})).id,
      choices: {
        create: [
          {
            value: '101',
            isCorrect: true,
          },
          {
            value: '110',
            isCorrect: false,
          },
        ],
      },
    },
    include: {
      choices: true,
    },
  });
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
