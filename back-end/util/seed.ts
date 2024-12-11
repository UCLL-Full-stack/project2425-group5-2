import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { lastDayOfDecade } from 'date-fns';
import { id } from 'date-fns/locale';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.game.deleteMany();
    await prisma.team.deleteMany();
    await prisma.coach.deleteMany();
    await prisma.player.deleteMany();
    await prisma.user.deleteMany();

    const admin = await prisma.user.create({
        data: {
            id: 1,
            firstName: 'Admin',
            lastName: 'Admin',
            password: await bcrypt.hash('Admin123!', 12),
            email: 'admin@teamtrack.be',
            phoneNumber: '0497000000',
            role: 'admin',
        },
    });

    const coach1 = await prisma.coach.create({
        data: {
            user: {
                create: {
                    id: 2,
                    firstName: 'Mark',
                    lastName: 'Zuckerberg',
                    password: await bcrypt.hash('Mark123!', 12),
                    email: 'testcoach@ucll.be',
                    phoneNumber: '0497000000',
                },
            },
        },
    });

    const coach2 = await prisma.coach.create({
        data: {
            user: {
                create: {
                    id: 3,
                    firstName: 'John',
                    lastName: 'Doe',
                    password: await bcrypt.hash('John123!', 12),
                    email: 'johndoe@ucll.be',
                    phoneNumber: '0497000007',
                },
            },
        },
    });

    const player1 = await prisma.player.create({
        data: {
            user: {
                create: {
                    id: 4,
                    firstName: 'Wayne',
                    lastName: 'Rooney',
                    password: await bcrypt.hash('Wayne123!', 12),
                    email: 'testplayer@ucll.be',
                    phoneNumber: '0497000001',
                },
            },
        },
    });

    const player2 = await prisma.player.create({
        data: {
            user: {
                create: {
                    id: 5,
                    firstName: 'Cristiano',
                    lastName: 'Ronaldo',
                    password: await bcrypt.hash('Cristiano123!', 12),
                    email: 'cristianoronaldo@ucll.be',
                    phoneNumber: '0497000002',
                },
            },
        },
    });

    const player3 = await prisma.player.create({
        data: {
            user: {
                create: {
                    id: 6,
                    firstName: 'Lionel',
                    lastName: 'Messi',
                    password: await bcrypt.hash('Lionel132!', 12),
                    email: 'lionelmessi@ucll.be',
                    phoneNumber: '0497000003',
                },
            },
        },
    });

    const player4 = await prisma.player.create({
        data: {
            user: {
                create: {
                    id: 7,
                    firstName: 'Rajo',
                    lastName: 'Timmermans',
                    password: await bcrypt.hash('Rajo123!', 12),
                    email: 'rajotimmermans@ucll.be',
                    phoneNumber: '0497000004',
                },
            },
        },
    });

    const player5 = await prisma.player.create({
        data: {
            user: {
                create: {
                    id: 8,
                    firstName: 'Sander',
                    lastName: 'Coemans',
                    password: await bcrypt.hash('Sander123!', 12),
                    email: 'sandercoemans@ucll.be',
                    phoneNumber: '0497000005',
                },
            },
        },
    });

    const player6 = await prisma.player.create({
        data: {
            user: {
                create: {
                    id: 9,
                    firstName: 'Eden',
                    lastName: 'Hazard',
                    password: await bcrypt.hash('Eden123!', 12),
                    email: 'edenhazard@ucll.be',
                    phoneNumber: '0497000006',
                },
            },
        },
    });

    const team1 = await prisma.team.create({
        data: {
            teamName: 'Test Team',
            coachId: coach1.id,
            players: {
                connect: [{ id: player1.id }, { id: player2.id }, { id: player3.id }],
            },
        },
    });

    const team2 = await prisma.team.create({
        data: {
            teamName: 'Other Team',
            coachId: coach2.id,
            players: {
                connect: [{ id: player4.id }, { id: player5.id }, { id: player6.id }],
            },
        },
    });

    const game1 = await prisma.game.create({
        data: {
            date: new Date(2024, 11, 17),
            result: '1-0',
            teams: {
                connect: [{ id: team1.id }, { id: team2.id }],
            },
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
