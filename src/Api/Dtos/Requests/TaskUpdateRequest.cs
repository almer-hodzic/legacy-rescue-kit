﻿using System.ComponentModel.DataAnnotations;

namespace Api.Dtos
{
    public class TaskUpdateRequest
    {
        [Required]
        public string Title { get; set; } = null!;

        public bool IsDone { get; set; }

        public DateTime? DueDate { get; set; }
    }
}

