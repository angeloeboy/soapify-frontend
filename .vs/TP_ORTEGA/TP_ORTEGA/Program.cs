using System;

namespace MyFirstProgram
{
    class Program
    {
        static void Main(string[] args)
        {
            Random random = new Random();
            bool playAgain = true;
            String player;
            String computer;
            String answer;

            while (playAgain)
            {
                player = "";
                computer = "";
                answer = "";

                while (player != "GOKU" && player != "VEGETA" && player != "WHIS")
                {
                    Console.WriteLine("WELCOME TO MY VERSION OF ROCKS PAPER SCISSORS. INSTRUCTION OF THE GAME: GOKU BEATS VEGETA, VEGETA BEATS WHIS, WHIS BEATS GOKU");
                    Console.WriteLine("Enter the Following inputs:");
                    Console.Write("GOKU, VEGETA, or WHIS: ");
                    player = Console.ReadLine();
                    player = player.ToUpper();
                }


                switch (random.Next(1, 4))
                {
                    case 1:
                        computer = "GOKU";
                        break;
                    case 2:
                        computer = "VEGETA";
                        break;
                    case 3:
                        computer = "WHIS";
                        break;
                }

                Console.WriteLine("Player move is: " + player);
                Console.WriteLine("Computer move is: " + computer);

                switch (player)
                {
                    case "GOKU":
                        if (computer == "GOKU")
                        {
                            Console.WriteLine("It's a draw!");
                        }
                        else if (computer == "WHIS")
                        {
                            Console.WriteLine("You lose!");
                        }
                        else
                        {
                            Console.WriteLine("You win!");
                        }
                        break;
                    case "VEGETA":
                        if (computer == "WHIS")
                        {
                            Console.WriteLine("You win!");
                        }
                        else if (computer == "VEGETA")
                        {
                            Console.WriteLine("It's a draw!");
                        }
                        else
                        {
                            Console.WriteLine("You lose!");
                        }
                        break;
                    case "WHIS":
                        if (computer == "VEGETA")
                        {
                            Console.WriteLine("You lose!");
                        }
                        else if (computer == "GOKU")
                        {
                            Console.WriteLine("You win!");
                        }
                        else
                        {
                            Console.WriteLine("It's a draw!");
                        }
                        break;
                }

                Console.Write("Would you like to play again (Y/N): ");
                answer = Console.ReadLine();
                answer = answer.ToUpper();

                if (answer == "Y")
                {
                    playAgain = true;
                }
                else
                {
                    playAgain = false;
                }

            }

            Console.WriteLine("Thanks for playing!");

            Console.ReadKey();
        }
    }
}

 