using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tweetinvi;
using Tweetinvi.Models;

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

        /**
         * Get the authenticated-user that owns the keys
         */
        [HttpGet]
        [Route("/twitter/get/auth-user")]
        public async Task<string> GetAuthUser()
        {
            var userClient = new TwitterClient(
                "nKnZ0bsAoh1yEUyhS3rX80CXj",
                "zUyhpprguk7CaAKx9hLc7H2GVirnYxiY5bDeTFlYHqODdD9yhU",
                "2227154571-4C1uI5ezWElzxG4CryuyzIFcpdybQfjPsu89v21",
                "r5PivBPp3WowpAF51a6Z64CXjkfN5wrS3Qv33oDPMwxqh"
                );

            var user = await userClient.Users.GetAuthenticatedUserAsync();
            return user.ScreenName;
        }

        /**
         * Get a specific user
         */
        [HttpGet]
        [Route("/twitter/get/user/{screenName}")]
        public async Task<string> GetSpecificUser(string screenName)
        {
            var userClient = new TwitterClient(
                "nKnZ0bsAoh1yEUyhS3rX80CXj",
                "zUyhpprguk7CaAKx9hLc7H2GVirnYxiY5bDeTFlYHqODdD9yhU",
                "2227154571-4C1uI5ezWElzxG4CryuyzIFcpdybQfjPsu89v21",
                "r5PivBPp3WowpAF51a6Z64CXjkfN5wrS3Qv33oDPMwxqh"
                );

            var user = await userClient.Users.GetUserAsync(screenName);
            var returnData = new
            {
                ID = user.IdStr,
                screenName = user.ScreenName,
                name = user.Name
            };

            return JsonConvert.SerializeObject(returnData);
        }

        /**
         * Get tweets for a user
         */
        [HttpGet]
        [Route("/twitter/get/tweets/by/user/{screenName}")]
        public async Task<string> GetTweetsByUser(string screenName, int limit = 10)
        {
            var userClient = new TwitterClient(
                "nKnZ0bsAoh1yEUyhS3rX80CXj",
                "zUyhpprguk7CaAKx9hLc7H2GVirnYxiY5bDeTFlYHqODdD9yhU",
                "2227154571-4C1uI5ezWElzxG4CryuyzIFcpdybQfjPsu89v21",
                "r5PivBPp3WowpAF51a6Z64CXjkfN5wrS3Qv33oDPMwxqh"
                );

            var tweets = await userClient.Timelines.GetUserTimelineAsync(screenName);
            var tweetIds = tweets.Select(tweet => tweet.IdStr);

            return JsonConvert.SerializeObject(tweetIds);
        }
    }
}
