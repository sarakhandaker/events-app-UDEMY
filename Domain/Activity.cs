using System;
using System.Collections.Generic;

namespace Domain
{
    public class Activity
    {
        //guid allows client to generate id
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public ICollection<ActivityAttendee> Attendees { get; set; }

    }
}