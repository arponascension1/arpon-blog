<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DummyUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [];
        $firstNames = [
            'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
            'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen',
            'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra',
            'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
            'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Melissa', 'George', 'Deborah', 'Timothy', 'Stephanie',
            'Ronald', 'Rebecca', 'Edward', 'Sharon', 'Jason', 'Laura', 'Jeffrey', 'Cynthia', 'Ryan', 'Kathleen',
            'Jacob', 'Amy', 'Gary', 'Shirley', 'Nicholas', 'Angela', 'Eric', 'Helen', 'Jonathan', 'Anna',
            'Stephen', 'Brenda', 'Larry', 'Pamela', 'Justin', 'Nicole', 'Scott', 'Emma', 'Brandon', 'Olivia',
            'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Gregory', 'Christine', 'Frank', 'Debra', 'Alexander', 'Rachel',
            'Raymond', 'Catherine', 'Patrick', 'Frances', 'Jack', 'Virginia', 'Dennis', 'Tiffany', 'Jerry', 'Maria',
        ];

        $lastNames = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
            'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
            'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
            'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
            'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner',
            'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers',
            'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox',
            'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly',
            'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry',
            'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons', 'Foster', 'Gonzales',
        ];

        $domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com', 'test.com'];

        for ($i = 1; $i <= 100; $i++) {
            $firstName = $firstNames[array_rand($firstNames)];
            $lastName = $lastNames[array_rand($lastNames)];
            $domain = $domains[array_rand($domains)];

            $name = $firstName.' '.$lastName;
            $email = strtolower($firstName.'.'.$lastName.$i.'@'.$domain);

            // Create some variation in the email to avoid duplicates
            if (rand(0, 2) === 1) {
                $email = strtolower($firstName.$i.'.'.$lastName.'@'.$domain);
            }

            $users[] = [
                'name' => $name,
                'email' => $email,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'is_admin' => false,
                'created_at' => now()->subDays(rand(1, 365))->subHours(rand(1, 23))->subMinutes(rand(1, 59)),
                'updated_at' => now(),
            ];
        }

        // Insert users in batches for better performance
        foreach (array_chunk($users, 50) as $batch) {
            User::insert($batch);
        }

        $this->command->info('100 dummy users created successfully!');
    }
}
