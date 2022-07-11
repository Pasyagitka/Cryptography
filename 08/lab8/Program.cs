using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


/*BBS(вар. 4)
    парам: n=512, p,q – обосновать выбор по соглас.с преподавателем (71, 7, n=497)
    n = p*q (при делении p,q на 4 дб остаток 3) - число Блюма
    x - вз. простое с n
    xt = (xo)^2 mod n

    Пр: 	p=71, q=7
	        71mod 4=3, 7mod 4=3
	        n=pq = 71*7 = 497

	        выберем х взаимно простое с n (например 17)
	        xo = 3** mod 497 = 289
	        x1 = 289** mod 497 = 25
   ------------------------------------------

    RC4 + оценка скорости генерации  
    n=5, ключ = { 12, 13, 90, 91, 240 }
*/

namespace lab8
{
    class Program
    {
        public static readonly int n = 497; //11 23
        public static readonly int x = 17;
        public static readonly int length = 13;

        public static int BBSnext(int prev, int index)
        {
            int res = (prev * prev) % n;
            Console.WriteLine($"x{index} = ({prev}*{prev})mod {n} = {res}");
            return res;
        }
        
        static void Main(string[] args)
        {
            int[] seq = new int[length];

            Console.WriteLine($"n = {n} (число Блюма)");
            Console.WriteLine($"x = {x}\n");
            int buf = x;

            long OldTicks = DateTime.Now.Ticks;
            for (int i = 0; i < length; i++)
            {
                buf = BBSnext(buf, i);
                seq[i] = buf;
            }
            Console.Write("\nПСП = ");
            foreach (int item in seq)
            {
                Console.Write($"{item}; ");
            }
            Console.WriteLine($"\nВремя зашифрования: {(DateTime.Now.Ticks - OldTicks) / 1000} мс");




            Console.WriteLine("\n\n\n ----------- R C 4 ---------------\n");

            int[] ikey = { 12, 13, 90, 91, 240 };
            byte[] key = new byte[ikey.Length];

            for (int i = 0; i < ikey.Length; i++)
            {
                key[i] = Convert.ToByte(ikey[i]);
            }

            RC4 rc = new RC4(key);
            RC4 rc2 = new RC4(key);
            byte[] testBytes = ASCIIEncoding.ASCII.GetBytes("proizvolniitext");


            byte[] encrypted = rc.Encode(testBytes, testBytes.Length);
            Console.WriteLine($"Зашифрованнная строка : {ASCIIEncoding.ASCII.GetString(encrypted)}");         


            byte[] decrypted = rc2.Encode(encrypted, encrypted.Length);
            Console.WriteLine($"Рашифрованнная строка : {ASCIIEncoding.ASCII.GetString(decrypted)}");
            
            Console.ReadKey();
        }
    }
}
