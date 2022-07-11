using System;

namespace _07
{
    class Program
    {

        static void Main(string[] args)
        {
            DES des = new DES();
            var enc = des.Encrypt("qwert", "lizaveta");
            var dec = des.Decrypt(enc, "lizaveta");
            Console.WriteLine("Encrypted text: " + enc);
            Console.WriteLine("Decrypted text: " + dec);
            Console.ReadLine();
        }
    }
}
