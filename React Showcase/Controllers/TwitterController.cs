using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Tweetinvi;

namespace React_Showcase.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TwitterController : ControllerBase
    {
        private readonly ILogger<TwitterController> _logger;

        public TwitterController(ILogger<TwitterController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("/twitter/get/feed")]
        public async Task<String> Get()
        {
            //TODO: Put these keys somewhere safe
            var userClient = new TwitterClient(
                "nKnZ0bsAoh1yEUyhS3rX80CXj",
                "zUyhpprguk7CaAKx9hLc7H2GVirnYxiY5bDeTFlYHqODdD9yhU",
                "2227154571-4C1uI5ezWElzxG4CryuyzIFcpdybQfjPsu89v21",
                "r5PivBPp3WowpAF51a6Z64CXjkfN5wrS3Qv33oDPMwxqh"
                );

            var user = await userClient.Users.GetAuthenticatedUserAsync();
            return user.ScreenName;
        }
    }
}
