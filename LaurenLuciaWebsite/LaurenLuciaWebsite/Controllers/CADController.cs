using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LaurenLuciaWebsite.Controllers
{
    public class CADController : Controller
    {
        //
        // GET: /CAD/

        public ActionResult aw2014()
        {
            return View();
        }

        //
        // GET: /CAD/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /CAD/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /CAD/Create

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
        // GET: /CAD/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /CAD/Edit/5

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
        // GET: /CAD/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /CAD/Delete/5

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
