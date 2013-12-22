using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LaurenLuciaWebsite.Controllers
{
    public class RunwayController : Controller
    {
        //
        // GET: /Runway/

        public ActionResult aw2014()
        {
            return View();
        }

        //
        // GET: /Runway/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Runway/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Runway/Create

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
        // GET: /Runway/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Runway/Edit/5

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
        // GET: /Runway/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Runway/Delete/5

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
