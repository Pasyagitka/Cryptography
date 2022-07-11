using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab9
{
    class Ranec
    {
        //Генерация сверхвозр посл-сти
        public int[] Generate(int z)
        {
            Random rnd = new Random();
            int[] k = new int[z];
            int sum = 0;
            for (int i = 0; i < z; i++)
            {
                k[i] = rnd.Next(sum, sum + 23);
                sum += k[i];
            }
            return k;
        }

        //Вычисление нормальной посл-сти:  ei=di*a (mod n)
        public int[] getNorm(int[] d, int a, int n, int z)
        {
            int[] e = new int[z];

            for (int i = 0; i < z; i++)
            {
                e[i] = (d[i] * a) % n;
            }
            return e;
        }

        // Зашифрование сообщения
        public int[] getcipher(int[] e, string M, int z)
        {
            int j = 0;
            int[] result = new int[M.Length];
            int total = 0;

            Console.Write("Исходное сообщение M: ");

            foreach (char Mi in M)
            {
                total = 0;
                string Mi2 = '0' + GetBytes(Mi.ToString()); //110010
                Console.Write($"{Mi2} ");

                for (int i = 0; i < Mi2.Length; i++)
                {
                    if (Mi2[i] == '1') total += e[i];
                }
                result[j] = total;
                j++;
            }
            return result;
        }

        //Расшифрование сообщения: Si=5, 5-3=2; 2-2=0;  mi=1100000
        public string decipher(int[] d, int Si, int z)
        {
            string res = "";
            string res2 = "";

            for (int i = z; i > 0; i--)
            {
                if (Si >= d[i-1])
                {
                    res += '1';
                    Si = Si - d[i-1];
                }
                else
                {
                    res += '0';
                }
            }
            for (int i = res.Length-1; i >-1; i--)
            {
                res2+= res[i];
            }
            return res2;
        }

        public int a_1(int a, int n)
        {
            int res = 0;
            for (int i = 0; i < 10000; i++)
            {
                if (((a * i) % n) == 1) return (i);
            }
            return (res);
        }

        public string Str(int[] a)
        {
            string res = "";
            foreach (int x in a)
            {
                res += x.ToString() + "; ";
            }
            return res;
        }

        public string GetBytes(String str)
        {
            String strB = "";
            for (int i = 0; i < str.Length; i++)
            {
                strB += Convert.ToString((int)str[i], 2);
            }
            return strB;
        }

    }
}
