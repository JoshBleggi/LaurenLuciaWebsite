using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LaurenLuciaWebsite.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.ImageList = GetNavImagePaths();

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public List<String> GetNavImagePaths()
        {
            var content = "~\\Content\\Images\\LaurenImages\\Nav\\Unselected\\";
            var path = Server.MapPath(content);
            DirectoryInfo Folder;
            FileInfo[] Images;

            Folder = new DirectoryInfo(path);
            Images = Folder.GetFiles();
            List<String> imagesList = new List<String>();

            for (int i = 0; i < Images.Length; i++)
            {
                    imagesList.Add(content.Replace("\\", "/") + Images[i].Name);
            }

            
            return imagesList;
        }
    }
}
