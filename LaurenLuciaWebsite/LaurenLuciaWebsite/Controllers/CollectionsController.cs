using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LaurenLuciaWebsite.Controllers
{
    public class CollectionsController : Controller
    {
        //
        // GET: /Collections/

        public ActionResult aw2014()
        {
            return View();
        }

        //
        // GET: /Collections/Details/5

        public ActionResult Lingerie()
        {
            return View();
        }

        public ActionResult pastWork()
        {
            return View();
        }

        //
        // GET: /Collections/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Collections/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Collections/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Collections/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Collections/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Collections/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
