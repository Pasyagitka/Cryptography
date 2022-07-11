using Aspose.Words;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace _15
{
    class Program
    {
        static string inFilePath_aprosh = @".\inText.docx";
        static string outFilePath_aprosh = @".\outText_aprosh.docx";

        static string inFilePath_size = @".\inText.docx";
        static string outFilePath_size = @".\outText_size.docx";


        static void Main(string[] args)
        {
            AproshEnc();
            AproshDec();

            SizeEnc();
            SizeDec();


            Console.ReadKey();
        }

        public static void AproshEnc()
        {
            Document inDoc = new Document(inFilePath_aprosh);
            Document outDoc = new Document(outFilePath_aprosh);
            outDoc.RemoveAllChildren();

            DocumentBuilder builder = new DocumentBuilder(outDoc);
            string inText = "";
            var runs = inDoc.GetChildNodes(NodeType.Run, true);
            for (int i = 1; i < runs.Count - 1; i++)
            {
                inText += runs[i].GetText();
            }

            BitArray bits = new BitArray(Encoding.UTF8.GetBytes("Liza"));
            for (int i = 0; i < bits.Length && i < inText.Length; i++)
            {
                Font font = builder.Font;
                font.Spacing = bits[i] ? 1 : 0.5;
                builder.Write(inText[i].ToString());
            }

            outDoc.Save(outFilePath_aprosh, SaveFormat.Docx);
        }
        public static void AproshDec()
        {
            Document inDoc = new Document(outFilePath_aprosh);

            var runs = inDoc.GetChildNodes(NodeType.Run, true);
            List<bool> bits = new List<bool>();
            for (int i = 1; i < runs.Count - 1; i++)
            {
                bits.Add(((Run)runs[i]).Font.Spacing == 1);
            }
            BitArray ba = new BitArray(bits.ToArray());
            byte[] bytes = new byte[(int)Math.Ceiling((double)ba.Length / 8)];
            ba.CopyTo(bytes, 0);
            Console.WriteLine("aprosh decryption: " + Encoding.UTF8.GetString(bytes));

        }
        public static void SizeDec()
        {
            Document document = new Document(outFilePath_size);
            DocumentBuilder builder = new DocumentBuilder(document);

            int lines_count = document.Sections[0].Body.Paragraphs.Count;
            String arr = "";
            int size = 0;

            for (int i = 1; i < lines_count; i++)
            {
                if (document.Sections[0].Body.Paragraphs[i].Runs[0] == null) break;
                if (document.Sections[0].Body.Paragraphs[i].Runs[0].Text.Contains("   "))
                {
                    size = i;
                    break;
                }

                if (document.Sections[0].Body.Paragraphs[i].Runs[0].Text.EndsWith("  "))
                {
                    arr += '1';
                }
                else
                {
                    arr += '0';
                }
            }
            Console.WriteLine("size decryption: " + BinaryToString(arr));
        }
        public static void SizeEnc()
        {
            Document document = new Document(inFilePath_size);
            DocumentBuilder builder = new DocumentBuilder(document);

            double lines_count = document.Sections[0].Body.Paragraphs.Count;
            String bin = StringToBinary("Liza");

            if (bin.Length > Math.Round(lines_count))
            {
                Console.WriteLine("Message length is more than possible");
                return;
            }


            for (int i = 0; i < bin.Length; i++)
            {
                String additional = bin[i] == '0' ? "" : " ";
                document.Sections[0].Body.Paragraphs[i].Runs[0].Text += additional;

                if (i + 1 == bin.Length)
                {
                    document.Sections[0].Body.Paragraphs[i + 1].Runs[0].Text += "  ";
                }
            }

            document.Save(outFilePath_size);
        }
        public static string StringToBinary(string data)
        {
            String sb = "";

            foreach (char c in data.ToCharArray())
            {
                sb += Convert.ToString(c, 2).PadLeft(8, '0');
            }

            while (sb.Length % 8 != 0)
            {
                sb = "0" + sb;
            }

            return sb;
        }
        public static string BinaryToString(string data)
        {
            List<Byte> byteList = new List<Byte>();

            for (int i = 0; i + 8 - 1 <= data.Length; i += 8)
            {
                byteList.Add(Convert.ToByte(data.Substring(i, 8), 2));
            }
            return Encoding.ASCII.GetString(byteList.ToArray());
        }
    }
}
