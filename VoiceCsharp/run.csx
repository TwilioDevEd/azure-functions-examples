#r "System.Runtime"

using System.Net;
using System.Text;
using Twilio.TwiML;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, 
    TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    var data = await req.Content.ReadAsStringAsync();
    var formValues = data.Split('&')
        .Select(value => value.Split('='))
        .ToDictionary(pair => Uri.UnescapeDataString(pair[0]).Replace("+", " "), 
                      pair => Uri.UnescapeDataString(pair[1]).Replace("+", " "));

    // Perform calculations, API lookups, etc. here
    
    // Insert spaces between the numbers to help the text-to-speech engine
    var number = formValues["From"]
        .Replace("+", "")
        .Aggregate(string.Empty, (c, i) => c + i + ' ')
        .Trim();

    var response = new VoiceResponse()
        .Say($"Your phone number is {number}");

    return new HttpResponseMessage
    {
        Content = new StringContent(response.ToString(), Encoding.UTF8, "application/xml")
    };
}
