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
    
    var response = new MessagingResponse()
        .Message($"You said: {formValues["Body"]}");

    return new HttpResponseMessage
    {
        Content = new StringContent(response.ToString(), Encoding.UTF8, "application/xml")
    };
}
