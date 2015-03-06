using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TokenTest.Controllers
{
    [Authorize]
    public class DummyController : ApiController
    {
        public string Get(string id)
        {
            return id;
        }
    }
}
