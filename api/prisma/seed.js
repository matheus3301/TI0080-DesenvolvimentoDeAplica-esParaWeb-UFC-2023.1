const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await createPrincipals();
  await createTeachers();
  await createStudents();
  await createQuestions();
  await createClasses();
  await createEnrollments();
}

async function createEnrollments() {
  await prisma.enrollment.deleteMany({});
  await prisma.enrollment.create({
    data: {
      classId: (await prisma.class.findFirst({})).id,
      studentId: (await prisma.student.findFirst({})).id,
    },
  });
}

async function createClasses() {
  await prisma.class.deleteMany({});
  await prisma.class.create({
    data: {
      title: 'Desenvolvimento de Aplicações Para Web',
      description: 'Turma da Cadeira TI0080',
      teacherId: (await prisma.teacher.findFirst({})).id,
    },
  });

  await prisma.class.create({
    data: {
      title: 'Engenharia de Software I',
      description: 'Aquela cadeira top que todo mundo tem que fazer',
      teacherId: (await prisma.teacher.findFirst({})).id,
    },
  });

  await prisma.class.create({
    data:{
      title: 'Redes de Computadores I',
      description: 'Redes :)',
      teacherId: (await prisma.teacher.findFirst({
        where:{
          name:{
            contains:"Atslands"
          }
        }
      })).id
    }
  });

  await prisma.class.create({
    data:{
      title: 'Internet das Coisas',
      description: 'IOT',
      teacherId: (await prisma.teacher.findFirst({
        where:{
          name:{
            contains:"Atslands"
          }
        }
      })).id
    }
  });

  await prisma.class.create({
    data:{
      title: 'Introdução ao Reconhecimento de Padrões',
      description: 'Redes :)',
      teacherId: (await prisma.teacher.findFirst({
        where:{
          name:{
            contains:"Guilherme"
          }
        }
      })).id
    }
  });
}
async function createPrincipals() {
  await prisma.admin.deleteMany({});
  await prisma.admin.create({
    data: {
      name: 'Jardel Silveira',
      profilePictureUrl:
        'https://deti.ufc.br/wp-content/uploads/2020/11/jardel-150x150.png',
      credentials: {
        create: {
          email: 'jardel@gmail.com',
          password: '123123',
          type: 'PRINCIPAL',
        },
      },
    },
    include: {
      credentials: true,
    },
  });
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

  await prisma.question.create({
    data: {
      statement:
        `(ENEM  2020) A caixa-d’água de um edifício terá a forma de um paralelepípedo retângulo reto com volume igual a 28 080 litros. Em uma maquete que representa o edifício, a caixa-d’água tem dimensões 2 cm × 3,51 cm × 4 cm.

        Dado: 1 dm³ = 1 L.
        
        A escala usada pelo arquiteto foi`,
      title: 'Matemática - Escala',
      teacherId: (await prisma.teacher.findFirst({})).id,
      choices: {
        create: [
          {
            value: '1 : 10',
            isCorrect: false,
          },
          {
            value: '1 : 100',
            isCorrect: true,
          },
          {
            value: '1 : 1 000',
            isCorrect: false,
          },
          {
            value: '1 : 10 000',
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
        `(Enem 2020). Nos livros Harry Potter, um anagrama do nome do personagem “TOM MARVOLO RIDDLE” gerou a frase “I AM LORD VOLDEMORT”.

        Suponha que Harry quisesse formar todos os anagramas da frase “I AM POTTER”, de tal forma que as vogais e consoantes aparecessem sempre intercaladas, e sem considerar o espaçamento entre as letras.
        
        Nessas condições, o número de anagramas formados é dado por`,
      title: 'Matemática - Permutação',
      teacherId: (await prisma.teacher.findFirst({})).id,
      choices: {
        create: [
          {
            value: '4! 5!',
            isCorrect: false,
          },
          {
            value: '2 x 4! 5!',
            isCorrect: true,
          },
          {
            value: '9! / 2',
            isCorrect: false,
          },
          {
            value: '4! 5! / 2',
            isCorrect: true,
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
        `(Enem/2019) Em um determinado ano, os computadores da receita federal de um país identificaram como inconsistentes 20% das declarações de imposto de renda que lhe foram encaminhadas. Uma declaração é classificada como inconsistente quando apresenta algum tipo de erro ou conflito nas informações prestadas. Essas declarações consideradas inconsistentes foram analisadas pelos auditores, que constataram que 25% delas eram fraudulentas. Constatou-se ainda que, dentre as declarações que não apresentaram inconsistências, 6,25% eram fraudulentas.

        Qual é a probabilidade de, nesse ano, a declaração de um contribuinte ser considerada inconsistente, dado que ela era fraudulenta?`,
      title: 'Matemática - Porcentagem',
      teacherId: (await prisma.teacher.findFirst({})).id,
      choices: {
        create: [
          {
            value: '0,1000',
            isCorrect: false,
          },
          {
            value: '0,1125',
            isCorrect: true,
          },
          {
            value: '0,3125',
            isCorrect: false,
          },
          {
            value: '0,5000',
            isCorrect: true,
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
        `(Enem/2019) Em um determinado ano, os computadores da receita federal de um país identificaram como inconsistentes 20% das declarações de imposto de renda que lhe foram encaminhadas. Uma declaração é classificada como inconsistente quando apresenta algum tipo de erro ou conflito nas informações prestadas. Essas declarações consideradas inconsistentes foram analisadas pelos auditores, que constataram que 25% delas eram fraudulentas. Constatou-se ainda que, dentre as declarações que não apresentaram inconsistências, 6,25% eram fraudulentas.

        Qual é a probabilidade de, nesse ano, a declaração de um contribuinte ser considerada inconsistente, dado que ela era fraudulenta?`,
      title: 'Matemática - Escala',
      teacherId: (await prisma.teacher.findFirst({})).id,
      choices: {
        create: [
          {
            value: 'X > 1 500',
            isCorrect: false,
          },
          {
            value: 'X < 3 000',
            isCorrect: true,
          },
          {
            value: '1 500 < X < 2 250',
            isCorrect: true,
          },
          {
            value: '1 500 < X < 3 000',
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
        `Em 1500, os portugueses chegaram nas terras que hoje correspondem ao Brasil. Sobre esse período, coloque verdadeiro (V) ou falso (F) nas afirmações abaixo:

        I. Os portugueses chegaram no Brasil em 18 de abril de 1500.
        II. Os portugueses vieram ao Brasil junto aos espanhóis para conquistar as terras.
        III. Os principais grupos étnicos no Brasil colônia eram: brancos, negros e índios.`,
      title: 'História - Período Colonial',
      teacherId: (await prisma.teacher.findFirst({})).id,
      choices: {
        create: [
          {
            value: 'F F V',
            isCorrect: true,
          },
          {
            value: 'F V V',
            isCorrect: false,
          },
          {
            value: 'V V F',
            isCorrect: false,
          },
          {
            value: 'V V V',
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
        `No período pré-colonial a atividade econômica que teve maior destaque foi:`,
      title: 'História - Período Colonial',
      teacherId: (await prisma.teacher.findFirst({})).id,
      choices: {
        create: [
          {
            value: 'Mineração',
            isCorrect: false,
          },
          {
            value: 'Café',
            isCorrect: false,
          },
          {
            value: 'Algodão',
            isCorrect: false,
          },
          {
            value: 'Pau Brasil',
            isCorrect: true,
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
        `O menor bioma brasileiro está localizado entre os estados Mato Grosso e Mato Grosso do Sul. Apresenta clima tropical continental e vegetação marcada por gramíneas, árvores de médio porte e plantas rasteiras. Trata-se de uma das maiores planícies inundáveis do mundo, sendo chamado de “reino das águas”.

        O bioma com essas características e que foi considerado Reserva da Biosfera e Patrimônio Natural Mundial é:`,
      title: 'Geografia - Biomas',
      teacherId: (await prisma.teacher.findFirst({})).id,
      choices: {
        create: [
          {
            value: 'Pampa',
            isCorrect: false,
          },
          {
            value: 'Pantanal',
            isCorrect: true,
          },
          {
            value: 'Mata Atlântica',
            isCorrect: false,
          },
          {
            value: 'Pradaria',
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
        `(UECE) O elemento químico com Z = 54 possui em sua camada de valência a configuração 5s2 5p6. Os elementos com Z = 52 e com Z = 56 pertencem às famílias dos:`,
      title: 'Química - Tabela Periódica',
      teacherId: (await prisma.teacher.findFirst({})).id,
      choices: {
        create: [
          {
            value: 'calcogênios e alcalinoterrosos',
            isCorrect: true,
          },
          {
            value: 'halogênios e alcalinos',
            isCorrect: false,
          },
          {
            value: 'halogênios e alcalinoterrosos',
            isCorrect: false,
          },
          {
            value: 'calcogênios e alcalinos',
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
